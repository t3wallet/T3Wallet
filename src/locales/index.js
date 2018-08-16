
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import zgh from 'react-intl/locale-data/zgh'
import ko from 'react-intl/locale-data/ko'
import en_ant from 'antd/lib/locale-provider/default'
import en_US_ant from 'antd/lib/locale-provider/en_US'
import zh_CN_ant from 'antd/lib/locale-provider/zh_CN'
import zh_TW_ant from 'antd/lib/locale-provider/zh_TW'
import ko_KR_ant from 'antd/lib/locale-provider/ko_KR'

import en_default from './default'
import zh_CN from './zh_CN'
import en_US from './en_US'
import ko_KR from './ko_KR'


addLocaleData([
  ...en,
  ...zh,
  ...zgh,
  ...ko,
  { locale: 'en_US', parentLocale: 'en' },
  { locale: 'zh_CN', parentLocale: 'zh' },
  { locale: 'zh_HK', parentLocale: 'zgh' },
  { locale: 'ko_KR', parentLocale: 'ko' },
])


export const ANT_LANGPACKAGE = {
  en: en_ant,
  en_US: en_US_ant,
  zh_CN: zh_CN_ant,
  zh_HK: zh_TW_ant,
  ko_KR: ko_KR_ant,
}

export const LANGPACKAGE = {
  en: en_default,
  en_US,
  zh_CN,
  zh_TW: zh_CN,
  ko_KR,
}

export const chooseLang = (browserLang) => {
  switch (browserLang) {
    case 'en':
    case 'en_US':
      return 'en_US'
    case 'zh':
    case 'zh_CN':
    case 'zh_HK':
    case 'zh_TW':
      return 'zh_CN'
    case 'ko':
    case 'ko_KR':
      return 'ko_KR'
    default:
      return 'en_US'
  }
}
