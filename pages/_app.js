import "../styles/globals.css";
import { Menu1 } from "../components/menues";
//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logoFin.svg";
// Context
import { SidebarProvider } from "../context/sidebarContext";
import { PaymentProvider } from "../context/paymentContext";

function MyApp({ Component, pageProps }) {
    return (
        <>
            {" "}
            <SidebarProvider>
                <PaymentProvider>
                    {/* <Menu1
                        logo={Logo.src}
                        menuItems={menuItems}
                        socialMedia={socialMedia}
                        burgerIcon={<RxHamburgerMenu />}
                        onBurgerClick={(e) => {
                            console.log(e);
                        }}
                        onClick={() => {
                            console.log("IS CLICKED");
                            setIsOpen(true);
                        }}
                    ></Menu1> */}
                    <Component {...pageProps} />
                </PaymentProvider>
            </SidebarProvider>
        </>
    );
}

export default MyApp;
