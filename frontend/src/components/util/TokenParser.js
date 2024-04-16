const TokenParser = (() => {
    const parser = {}

    parser.parseToUserId = (token) => {
        if (!token) {
          return "";
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''));
        const payload = JSON.parse(jsonPayload);
        const userId = payload.sub;
        return userId;
    }

    return parser;
})();

export default TokenParser;