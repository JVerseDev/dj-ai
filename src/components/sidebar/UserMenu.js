import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User } from '@nextui-org/react';

function UserMenu({ userQuery }) {

    return (
        <Dropdown
            showArrow
            radius="sm"
            classNames={{
                base: "p-0 border-small border-divider bg-background",
                arrow: "bg-default-100",
            }}
        >
            <DropdownTrigger>
                <Button className='w-full' variant="light" disableRipple>
                    {userQuery.isLoading && userQuery.fetchStatus === 'idle'
                        ? "Sign-in to Spotify"
                        : userQuery.isLoading
                            ? <p>Loading...</p>
                            : <User
                                name={userQuery.data.display_name}
                                classNames={{
                                    name: "text-default-600",
                                    description: "text-default-500",
                                }}
                                avatarProps={{
                                    size: "sm",
                                    src: userQuery.data.images[0].url,
                                }}
                            />
                    }
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3 w-72"
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                {userQuery.isLoading && userQuery.fetchStatus === 'idle'
                    ? null
                    : userQuery.isLoading
                        ? <p>Loading...</p>
                        : <DropdownSection aria-label="Profile & Actions">
                            <DropdownItem
                                isReadOnly
                                key="profile"
                                className="h-14 gap-2 opacity-100"
                            >
                                <User
                                    name={userQuery.data.display_name}
                                    description={`@${userQuery.data.id}`}
                                    classNames={{
                                        name: "text-default-600",
                                        description: "text-default-500",
                                    }}
                                    avatarProps={{
                                        size: "sm",
                                        src: userQuery.data.images[0].url,
                                    }}
                                />
                            </DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                            <DropdownItem
                                key="log_out"
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownSection>
                }
            </DropdownMenu>
        </Dropdown >
    );

}

export default UserMenu;
