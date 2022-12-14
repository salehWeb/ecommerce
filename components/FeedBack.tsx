import { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment'
import { IUser } from '../types/user';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IComment } from '../types/comment';

interface ICommentProps {
    item: IComment;
    handelDelete: (commentId: number) => void;
    setIsUpdateById: (commentId: number | null) => void;
}

const FeedBack = ({ item, handelDelete, setIsUpdateById }: ICommentProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)


    const handelDeleteComment = async () => {
        await handelDelete(item.id)
        setIsVisible(false)
    }

    const handelUpdate = () => {
        setIsUpdateById(item.id)
    }

    useEffect(() => {
        // @ts-ignore
        const data: IUser | null = JSON.parse(localStorage.getItem("user") || null);
        if (data) setUser(data);
    }, [])

    return (
        <section className="justify-center w-full flex flex-col items-center rounded-lg shadow-lg bg-white px-4 p-2">
            <div className="flex cursor-pointer relative w-full items-center">
                {user && item.userId === user?.id && (
                    <MoreVertIcon onClick={() => setIsVisible(!isVisible)} />
                )}
                <p className="flex text-blue-600  items-center justify-center ml-2">
                    {item.user.firstName + " " + item.user.lastName}
                </p>
                {isVisible && (
                    <ul className="absolute flex justify-center items-center min-w-[120px] -bottom-[100px]  bg-gray-100 flex-col p-2 z-[5] shadow-lg  rounded-lg">
                        <li onClick={handelDeleteComment} className="flex flex-row justify-between w-full p-2 hover:bg-slate-200 rounded-lg items-center"><p> Delete </p> <DeleteOutlineOutlinedIcon /></li>
                        <li onClick={handelUpdate} className="flex flex-row justify-between w-full p-2 hover:bg-slate-200 rounded-lg items-center"><p> Update </p> <ModeEditIcon /></li>
                    </ul>
                )}
            </div>
            <hr className="flex w-full my-[3.5px]" />
            <main className='flex w-full rounded-lg flex-row justify-between items-center'>
                <div className="flex h-9 w-9 rounded-lg justify-center items-center">
                    <Image
                        width={20}
                        height={20}
                        src={`https://avatars.dicebear.com/api/bottts/${item.user.firstName + " " + item.user.lastName}.svg`}
                        alt={"User Profile"} className="object-contain rounded-lg shadow-2xl flex w-full h-full" />
                </div>
                <em className='flex place-self-center items-center ml-2 text-sm w-full'>{moment(item.createdAt).format("ll")}</em>
            </main>
            <p className="text-lg p-1 flex place-self-center items-center ml-2 w-full">{item.content}</p>
        </section>
    )
}

export default FeedBack;