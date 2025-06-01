'use client';

import {Avatar, Button} from '@mui/material';
import React, {ChangeEvent} from 'react';

interface Props{
    avatar: string;
    onUpload: (e:ChangeEvent<HTMLInputElement>)=>void;
    onDelete: ()=>void;
};

export default function AvatarUploader({avatar, onUpload, onDelete}: Props){
   return(
        <>
        <Avatar src={avatar} sx={{width: 100, height:100, margin: '0 auto', mb:2}}/>
        <Button variant="outlined" component="label" sx={{mb:2}}>
            Change pic 
            <input type="file" hidden accept="image/*" onChange={onUpload}/>
        </Button>
        <Button variant="outlined" onClick={onDelete} sx={{mb:2}}>
            Delete pic 
        </Button>
        </>
    );
};