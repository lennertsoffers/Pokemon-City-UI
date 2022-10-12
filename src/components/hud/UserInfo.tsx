const UserInfo = ({ onClick, username, level }: { onClick: Function; username: string; level: number }) => {
    const handleClick = () => {
        if (!onClick) return;

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
