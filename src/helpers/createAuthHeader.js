const createAuthHeader = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
};

export default createAuthHeader;
