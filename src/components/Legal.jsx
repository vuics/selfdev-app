import React, { useState, useEffect } from 'react'
import {
  Container,
  Divider,
  Segment,
  Loader,
} from 'semantic-ui-react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { QCMarkdown } from './Text'
import { useIndexContext } from './IndexContext'

export const loadLegal = async ({ docType, lang, country, t }) => {
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

  // return null;
  return t('Error loading the legal document.');
};

export default function Legal ({ docType }) {
  const { t, i18n } = useTranslation('Legal');
  const { country } = useIndexContext()
  const [ legal, setLegal ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  console.log('legal:', legal)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const lang = i18n.language || 'en';
      const legal = await loadLegal({ docType, lang, country, t });
      setLegal(legal);
      setLoading(false)
    };

    load();
  }, [i18n.language]);

  return (
    <Container>
      <Divider hidden />
      <Segment>
        { loading ? (
          <Loader active inline="centered" content={t("Loading...")} />
        ) : (
          <QCMarkdown dark>
            {legal || t('Loading the legal document...')}
          </QCMarkdown>
        )}
      </Segment>
      <Divider hidden />
    </Container>
  );
};
