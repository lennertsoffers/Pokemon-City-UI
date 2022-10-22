/** Component containing the name of the user and his/her level */
const UserInfo = ({ onClick, username, level }: { onClick: Function; username: string; level: number }) => {
    /**
     * Triggers the onClick function from the properties
     */
    const handleClick = () => {
        onClick();
    };

    return (
        <div className="userInfo" onClick={handleClick}>
            <div className="userInfo--background">
                <img src="./assets/ui/user.png" alt="userinfo" />
            </div>
            <div className="userInfo--foreground">
                <div>
                    <div>{username}</div>
                    <div>{level}</div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
