const logout = async (req, res) => {
    res.cookie("userSaved", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });

    ////////////////////// NEW //////////////////////
    res.cookie("adminSaved", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    
    ////////////////////////////////////////////////

    res.status(200).redirect("/");
};

module.exports = logout;