const Header = () => {
    const handleReloadHomePage = () => {
        window.location.reload();
    };
    return (
        <div>
            <div style={{ cursor: "pointer" }} onClick={() => handleReloadHomePage()}>
                <h1>Tracking</h1>
            </div>
        </div>
    )
}
export default Header;