import { Container } from '@mui/material'
import React from 'react'
import { AnimatedHeader } from '../AnimatedHeader'
import DynamicGallery from '../ui/dynamic-gallery'
import { EventsData } from '@/lib/data'

function ActivityEventGallery() {

  return (
    <>
      <Container className='w-screen min-h-screen'>

        <AnimatedHeader
          miniHeader="🎉 Activities & Events"
          title="Activities And"
          highlight="Events Gallery"
          subtitle="Discover memorable moments from our school’s activities, celebrations, and special events."

          align="center"

          titleVariant="h3"
          subtitleVariant="body1"
        />


        <DynamicGallery data={EventsData} />
      </Container>
    </>
  )
}

export default ActivityEventGallery