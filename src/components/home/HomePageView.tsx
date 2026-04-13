import type { CSSProperties } from 'react'
import type { HomePageData } from '@/lib/home/types'
import { getPublicThemeVars } from '@/lib/theme/publicTheme'

import { ReferenceHome } from './reference/ReferenceHome'

type HomePageViewProps = {
  data: HomePageData
}

export function HomePageView({ data }: HomePageViewProps) {
  return (
    <div style={getPublicThemeVars(data.theme) as CSSProperties}>
      <ReferenceHome data={data} />
    </div>
  )
}
