import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

export default function PostCard({
    $id, title, featuredImage
}) {
    return (
        <div>
            <Link
                to={`/post/${$id}`}
            >
                <div className='w-full rounded-xl p-4 bg-gray-200'>
                    <div className='w-full justify-center my-4'>

                        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                    </div>
                    <h2 className='text-xl font-bold'>{title}</h2>
                </div>
            </Link>
        </div>
    )
}
