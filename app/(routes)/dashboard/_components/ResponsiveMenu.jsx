import React, { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const ResponsiveMenu = () => {

    const components = [
        { title: "Dashboard", href: "/dashboard", description: "View your dashboard" },
        { title: "Budgets", href: "/dashboard/budgets", description: "View your budgets" },
        { title: "Expenses", href: "/dashboard/expenses", description: "View your expenses" },
        { title: "Upgrade", href: "/dashboard/upgrade", description: "Upgrade your account" }
    ]



    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger  ><Menu /></NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <NavigationMenuLink asChild>

                            <ul className="grid gap-1 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <li>
                                        <a className={"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"}
                                            href={component.href}
                                        >

                                            <div className="text-sm font-medium leading-none">{component.title}</div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = (({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})

export default ResponsiveMenu