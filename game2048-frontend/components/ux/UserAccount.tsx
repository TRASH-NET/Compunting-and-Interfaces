'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IJwtPayload } from '@/Interfaces/jwtPayload.interface';
import { jwtDecode } from 'jwt-decode';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { logout } from '@/models/auth';
import { useRouter } from 'next/navigation';



interface UserAccountProps {
    sesion: string | null;
}

const UserAccount: React.FC<UserAccountProps> = ({ sesion }) => {

    const decodeToken: IJwtPayload | null = sesion ? jwtDecode(sesion) : null;
    const router = useRouter();

    const handleLogout = async () => {
        try {
            if (sesion) {
                await logout(sesion);
                router.push('/auth/login');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar
                        className='self-end my-4 hover:cursor-pointer'
                    >
                        <AvatarFallback className='bg-black  text-white'>
                            {decodeToken?.playerName ? decodeToken.playerName[0] : 'U'}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-20">
                    <DropdownMenuLabel>{decodeToken?.playerName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className='hover:cursor-pointer'
                            onClick={handleLogout}
                        >
                            <span>Cerrar Sesion</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserAccount;