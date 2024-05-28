import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2>Hello, {user?.displayName ? user.displayName : 'Sir'}! Welcome back</h2>
        </div>
    );
};

export default UserHome;