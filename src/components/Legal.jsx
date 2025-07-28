import React, { useState, useEffect } from 'react'
import {
  Container,
  Divider,
  Segment,
} from 'semantic-ui-react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { QCMarkdown } from './Text'

export const loadLegal = async (docType, lang, country) => {
  const normalizedLang = lang.split('-')[0].toLowerCase();
  const normalizedCountry = country.toUpperCase();

  const key = `${normalizedLang}-${normalizedCountry}`;
  const url = `/legal/${docType}/${key}.md`;

  const fallbackKey = `${normalizedLang}_default`;
  const fallbackUrl = `/legal/${docType}/${fallbackKey}.md`;

  console.log('url:', url);
  console.log('fallbackUrl:', fallbackUrl);

  try {
    const res = await axios.get(url, {
      baseURL: window.location.origin, // Ensures it hits the correct dev server
      headers: {
        'Accept': 'text/plain',
      },
    });
    return res.data;
  } catch (e) {
    console.warn(`Failed to load primary markdown: ${url}`, e);
  }

  try {
    const res = await axios.get(fallbackUrl, {
      baseURL: window.location.origin,
      headers: {
        'Accept': 'text/plain',
      },
    });
    return res.data;
  } catch (e) {
    console.warn(`Failed to load fallback markdown: ${fallbackUrl}`, e);
  }

  return null;
};

// Simple stub (replace with IP-based logic if needed)
const getUserCountry = () => '';
// const getUserCountry = () => 'US';
// const getUserCountry = () => 'RU';

export default function Legal ({ docType }) {
  const { i18n } = useTranslation();
  const [ legal, setLegal ] = useState(null);
  console.log('legal:', legal)

  useEffect(() => {
    const load = async () => {
      const lang = i18n.language || 'en';
      const country = getUserCountry();

      // Use for testing
      // const lang = 'ru'
      // const country = 'RU'
      // const lang = 'en'
      // const country = 'US'
      // const country = ''

      const legal = await loadLegal(docType, lang, country);
      setLegal(legal);
    };

    load();
  }, [i18n.language]);

  return (
    <Container>
      <Divider hidden />
      <Segment>
        <QCMarkdown dark>
          {legal || `*Loading ${docType}...*`}
        </QCMarkdown>
      </Segment>
      <Divider hidden />
    </Container>
  );
};
