import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";


interface Props {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-gray-100">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout;