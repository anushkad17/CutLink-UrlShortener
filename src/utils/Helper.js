import { subDomainList } from "./constant";

export const getSubDomain = (hostname) => {
  const parts = hostname.split(".");
  const isLocalhost = parts.includes("localhost");
  return isLocalhost ? "" : parts[0]; // "s" or "" (default)
};

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main);
  const matchedApp = subDomainList.find((app) => app.subdomain === subdomain);

  return matchedApp ? matchedApp.app : mainApp.app;
};

// url.localhost
// url.urlbestshort.com
export const parseSubDomain = (location) => {
    const locationParts = location.split(".");
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    const sliceTill = isLocalhost ? -1 : -2;
    return locationParts.slice(0, sliceTill).join("");
};
