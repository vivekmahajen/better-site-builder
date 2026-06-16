// Accurate sidereal (Lahiri) astronomy for the Puja Calculator.
// Uses astronomy-engine for geocentric apparent positions; applies Lahiri
// ayanamsa to convert tropical → sidereal. Server-side only.
import * as A from "astronomy-engine";

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const norm360 = (x) => ((x % 360) + 360) % 360;

function jd(date) { return date.getTime() / 86400000 + 2440587.5; }
function julianCenturies(date) { return (jd(date) - 2451545.0) / 36525.0; }

// Mean obliquity of the ecliptic (degrees), Meeus.
function obliquity(date) {
  const T = julianCenturies(date);
  return 23.439291111 - 0.0130041667 * T - 1.6388889e-7 * T * T + 5.036111e-7 * T * T * T;
}

// Lahiri ayanamsa (degrees): ~23°51'10" at J2000.0, precessing ~50.29"/yr.
export function lahiriAyanamsa(date) {
  return 23.8528 + ((jd(date) - 2451545.0) / 365.25) * (50.2877 / 3600);
}

function planetEclLon(body, date) {
  const vec = A.GeoVector(body, date, true); // geocentric EQJ, aberration-corrected
  const ect = A.RotateVector(A.Rotation_EQJ_ECT(date), vec); // ecliptic of date
  return norm360(A.SphereFromVector(ect).lon);
}

// Rahu = mean ascending lunar node (Meeus), tropical → sidereal.
function meanNodeTropical(date) {
  const T = julianCenturies(date);
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T * T * T) / 467441 - (T * T * T * T) / 60616000);
}

// Sidereal ecliptic longitudes (0–360) of all nine grahas at a UTC instant.
export function siderealLongitudes(date) {
  const ayan = lahiriAyanamsa(date);
  const sid = (tropLon) => norm360(tropLon - ayan);
  const rahuTrop = meanNodeTropical(date);
  return {
    Sun: sid(A.SunPosition(date).elon),
    Moon: sid(A.EclipticGeoMoon(date).lon),
    Mars: sid(planetEclLon(A.Body.Mars, date)),
    Mercury: sid(planetEclLon(A.Body.Mercury, date)),
    Jupiter: sid(planetEclLon(A.Body.Jupiter, date)),
    Venus: sid(planetEclLon(A.Body.Venus, date)),
    Saturn: sid(planetEclLon(A.Body.Saturn, date)),
    Rahu: sid(rahuTrop),
    Ketu: sid(rahuTrop + 180),
  };
}

// Sidereal ascendant (Lagna) longitude 0–360 for a UTC instant + geo coords.
export function ascendantSidereal(date, latDeg, lonDeg) {
  const gast = A.SiderealTime(date); // apparent sidereal time at Greenwich, hours
  const ramc = norm360(gast * 15 + lonDeg) * D2R; // local apparent sidereal time (RAMC)
  const eps = obliquity(date) * D2R;
  const lat = latDeg * D2R;
  let asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps)));
  asc = norm360(asc * R2D); // tropical ascendant
  return norm360(asc - lahiriAyanamsa(date));
}
