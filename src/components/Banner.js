import React from 'react';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import { BANNER_IMAGE } from '@/lib/data';
import NavLinkBtn from './navbar/NavLinkBtn';

const Banner = ({ title, backgroundImage = null }) => {
    backgroundImage = backgroundImage ? backgroundImage : BANNER_IMAGE;

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: 300,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                overflow: 'hidden',
                px: 2,
            }}
        >
            {/* Dark overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }}
            />

            {/* Centered content */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        color: 'white', // Explicitly white
                    }}
                >
                    {title}
                </Typography>

                <Breadcrumbs
                    sx={{
                        mt: 2,
                        color: 'white',
                        '& a': { color: 'white', textDecoration: 'underline' },
                        '& .MuiTypography-root': { color: 'white' },
                    }}
                    separator=">>"
                    aria-label="breadcrumb"
                >
                    <NavLinkBtn href="/" title="Home" sx={{ color: 'white !important' }} />

                    <Typography>{title}</Typography>
                </Breadcrumbs>
            </Box>
        </Box>
    );
};

export default Banner;
