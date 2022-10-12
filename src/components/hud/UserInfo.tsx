const UserInfo = ({ onClick, username, level }: { onClick: Function; username: string; level: number }) => {
    const handleClick = () => {
        if (!onClick) return;

        onClick();
    };

    return (
        <div onClick={handleClick}>
            <div className="hud__left--background">
                <img src="./assets/ui/user.png" alt="user" />
            </div>
            <div className="hud__left--foreground">
                <div>
                    <div>{username}</div>
                    <div>LV. {level}</div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
