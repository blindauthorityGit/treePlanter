import "../styles/globals.css";
import { Menu1 } from "../components/menues";
//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logoFin.svg";
// Context
import { combineProviders } from "react-combine-providers";
import { SidebarProvider } from "../context/sidebarContext";
import { PaymentProvider } from "../context/paymentContext";
import { DataProvider } from "../context/dataContext";

const MyAppProvider = combineProviders([SidebarProvider, PaymentProvider]);

function MyApp({ Component, pageProps }) {
    return (
        <>
            <DataProvider>
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
            </DataProvider>
        </>
    );
}

export default MyApp;
