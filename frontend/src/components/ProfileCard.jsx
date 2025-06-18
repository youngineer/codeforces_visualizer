import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { fetchUserDetails } from '@/services/helper';

export default function ProfileCard() {
  

    const goToCodeforcesProfile = () => {

    };

  return (
    <Card sx={{ maxWidth: 345 }} className='flex justify-center'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="user profile photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='text-blue-600 underline' onClick={goToCodeforcesProfile}>
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
