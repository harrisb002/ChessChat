"use client"

interface ClubSearchProps {
    data: {
        label: string;
        type: "channel" | "member",
        data: {
            icon: React.ReactNode;
            name: string,
            id: string;
        }[] | undefined
    }[]
}

export const ClubSearch = ({
    data
}: ClubSearchProps) => {
    return (
        <div>
            Club Search Component
        </div>
    )
}