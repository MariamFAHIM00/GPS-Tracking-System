import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserNav = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);            
            setUserData(decodedToken.user);
        }
    }, []);

    const renderInitials = () => {
        if (userData && userData.firstName && userData.lastName) {
            return userData.firstName.charAt(0) + userData.lastName.charAt(0);
        }
        return 'SR'; // Default initials
    }

    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="./client/public/02.png" alt="User Avatar" />
                        <AvatarFallback className={"uppercase"}>{renderInitials()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[99998] mr-2">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userData ? userData.firstName + ' ' + userData.lastName : 'Sijin Raj'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userData ? userData.email : 'sijin@outlook.com'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <a onClick={logout}>Log out</a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserNav;
