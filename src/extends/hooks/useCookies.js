export function useCookies() {
  const getCookie = (name) => {
    const cookieArr = document.cookie.split("; ");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.split("=");
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };

  const setCookie = (name, value, options = {}) => {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    const expiresDays = options.expires || 7;
    const date = new Date();
    date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
    cookieStr += `; expires=${date.toUTCString()}`;

    if (options.path) {
      cookieStr += `; path=${options.path}`;
    }

    document.cookie = cookieStr;
  };

  const removeCookie = (name, path = "/") => {
    setCookie(name, "", { expires: -1, path });
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
}