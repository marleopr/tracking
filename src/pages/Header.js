import { styled } from "styled-components";
import trackingLogo from "../assets/tracking logo.png"
import DownloadButton from "../components/loadersButtons/DownloadButton";
const Header = () => {

    const handleReloadHomePage = () => {
        window.location.reload();
    };
    return (
        <div>
            <div style={{ cursor: "pointer" }} onClick={() => handleReloadHomePage()}>
                <ImgLogo src={trackingLogo} />
            </div>
            <DownloadButton />
        </div>
    )
}
export default Header;
const ImgLogo = styled.img`
    width: 250px;
    margin: 10px;
`