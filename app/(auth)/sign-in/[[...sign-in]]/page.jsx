import { SignIn } from "@clerk/nextjs";
import Logo from "../../../../public/logo-white.png"
import Image from "next/image";

export default function Page() {
    return <section className="bg-white" >
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-32 items-end bg-primary lg:col-span-5 lg:h-full xl:col-span-6">


                <div className="hidden lg:relative lg:block lg:p-12">
                    <a className="block text-white" href="/">
                        <span className="sr-only">Home</span>
                        <Image width={250} src={Logo} />
                    </a>

                    <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                        Welcome to Expense Tracker 💸
                    </h2>

                    <p className="mt-4 leading-relaxed text-white/90">
                        Effortlessly manage your finances with our comprehensive expense tracking tool. Stay organized, monitor your spending, and achieve your financial goals with ease. Join us today and take control of your budget!
                    </p>
                </div>
            </section>

            <main
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div className="max-w-xl lg:max-w-3xl">
                    <div className="relative -mt-28 block mb-4 lg:hidden">
                        <a className="block text-white" href="/">
                            <span className="sr-only">Home</span>
                            <Image width={250} src={Logo} />
                        </a>

                        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Welcome to Expense Tracker 💸
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Effortlessly manage your finances with our comprehensive expense tracking tool. Stay organized, monitor your spending, and achieve your financial goals with ease. Join us today and take control of your budget!

                        </p>
                    </div>

                    <SignIn />
                </div>
            </main>
        </div>
    </section>;
}