import { Card, Box, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import StickerForm from '../components/stickers/request-form'

import axios from 'axios'

const color = '#EC37AD'

function customStartCase(st) {
  return st
    .replace(/\.(svg|png)$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

import { useState, useMemo } from 'react'

const StickersPage = ({ stickers = [] }) => {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    if (!search) return stickers
    const q = search.toLowerCase()
    return stickers.filter(st =>
      (st.name || '').toLowerCase().includes(q) ||
      (st.artist || '').toLowerCase().includes(q) ||
      (st.event || '').toLowerCase().includes(q)
    )
  }, [search, stickers])

  function getTitle(st) {
    const n = st.name || ''
    const a = st.artist
    const e = st.event
    if (a && e) return `${n} made by ${a} for ${e}`
    if (a) return `${n} made by ${a}`
    if (e) return `${n} for ${e}`
    return n
  }

  return [
  <Box as="main" key="main" sx={{ textAlign: 'center' }}>
    <ForceTheme theme="dark" />
    <Nav dark />
    <Meta
      as={Head}
      title="Stickers"
      description="Check out Hack Club’s stickers."
      image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fstickers.png?v=1588012712143"
    />
    <Box
      as="article"
      sx={{ position: 'relative', overflow: 'hidden', py: [6, 7], px: 4 }}
    >
      <BGImg
        width={2732}
        height={1821}
        alt="Students exchanging stickers"
        src="/stickers/hero.jpg"
        gradient
      />
      <Card
        sx={{
          variant: 'cards.translucentDark',
          bg: 'rgba(0, 0, 0, 0.5) !important',
          position: 'relative',
          overflow: 'visible',
          maxWidth: 'copy',
          mx: 'auto',
          my: [4, 5],
          py: 3
        }}
      >
        <Box
          as="aside"
          sx={{
            display: ['none', 'flex'],
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            width: '100%',
            img: {
              mx: 3,
              flexShrink: 0,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
            }
          }}
        >
          <Image
            src="/stickers/macintosh.svg"
            alt="Macintosh sticker"
            sx={{
              transform: 'rotate(-12deg)',
              width: '4.5rem',
              height: '6rem'
            }}
          />
          <Image
            src="/stickers/2020_progress.png"
            alt="Pride sticker"
            sx={{
              transform: 'rotate(3deg)',
              width: ['4rem', '6rem'],
              height: ['4rem', '6rem']
            }}
          />
          <Image
            src="/stickers/enjoy.svg"
            alt="Enjoy Hack Club Coca-Cola sticker"
            sx={{
              transform: 'rotate(-12deg)',
              width: ['6rem', '7.5rem'],
              height: ['4rem', '5rem']
            }}
          />
        </Box>
        <Heading
          as="h1"
          variant="ultratitle"
          sx={theme => ({
            color: 'primary',
            ...theme.util.gxText(color, 'red'),
            mt: [3, 4]
          })}
        >
          Unparalleled stickers.
        </Heading>
        <Text as="p" variant="lead" color="muted">
          Every Hack Club gets free, high-quality stickers.
        </Text>
      </Card>
    </Box>
    <Card
      as="section"
      sx={{
        bg: 'darkless',
        maxWidth: 'copyUltra',
        mx: 'auto',
        my: [4, 5],
        py: [3, 4],
        overflow: 'visible'
      }}
    >
      <Heading as="h2" variant="title" color="white">
        Gotta collect ‘em all.
      </Heading>
      <Box as="form" mb={4} sx={{ textAlign: 'center' }} onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search stickers"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: 'min(100%, 400px)'
          }}
          aria-label="Search stickers"
        />
      </Box>
      <Grid columns={[2, 3]} gap={[3, 4]} mt={[3, 4]}>
        {filtered.map(st => (
          <Flex
            key={st.name || st.image}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              img: {
                objectFit: 'contain',
                width: [128, 160],
                height: [128, 160],
                transition: '.25s transform ease-in-out',
                ':hover': {
                  transform: 'scale(1.5)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
                }
              }
            }}
          >
            <Image
              src={st.image}
              width={128}
              height={128}
              alt={st.name || ''}
              title={getTitle(st)}
            />
            <Text as="span" variant="caption" sx={{ fontSize: 2, mt: [2, 3] }}>
              {customStartCase(st.name || '')}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Card>
    {/*
    <Card
      as="section"
      sx={{
        bg: 'darkless',
        maxWidth: 'copy',
        mx: 'auto',
        my: [4, 5],
        py: [3, 4]
      }}
    >
      <Heading as="h2" variant="title" color="white" mb={4}>
        Request a free envelope
      </Heading>
      <StickerForm />
    </Card>
*/}
  </Box>,
  <Footer dark key="footer" />
  ]
}

export default StickersPage

export const getStaticProps = async () => {
  // Fetch all records from the Airtable base/table provided.
  // Uses process.env.AIRTABLE_API_KEY for authentication.
  const baseUrl =
    'https://api.airtable.com/v0/appptawPLliuvjDZp/Full%20Sticker%20DB'
  const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
  }

  const stickers = []
  try {
    let offset = undefined
    do {
      const params = offset ? { offset } : {}
      const res = await axios.get(baseUrl, { headers, params })
      const body = res.data
      if (Array.isArray(body.records)) {
        body.records.forEach(r => {
          const fields = r.fields || {}
          const name = fields['Sticker Name'] || fields['Name'] || ''
          let image = ''
          const imgField = fields['Sticker Image Link']
          if (Array.isArray(imgField) && imgField.length) {
            const first = imgField[0]
            if (typeof first === 'object' && first.url) image = first.url
            else if (typeof first === 'string') image = first
          } else if (typeof imgField === 'string') {
            image = imgField
          }
          const artist = fields['Artist'] || ''
          const event = fields['Event'] || ''
          // Only include if we have an image URL
          if (image) stickers.push({ name, image, artist, event })
        })
      }
      offset = body.offset
    } while (offset)
  } catch (err) {
    // On error, log and return empty list so build doesn't fail silently.
    // Next will surface build warnings; in production consider failing the build
    // or providing a fallback.
    // eslint-disable-next-line no-console
    console.error('Error fetching stickers from Airtable:', err.message || err)
  }

  // Sort alphabetically by name (case-insensitive)
  stickers.sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }))

  return { props: { stickers } }
}
