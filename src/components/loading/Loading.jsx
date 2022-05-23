import React from 'react'
import { JellyTriangle } from '@uiball/loaders'
import './loading.css'

export const Loading = () => {
  return (
    <div className="container-loading bg-dark">
      <div>
        <JellyTriangle
          size={60}
          speed={0.75}
          color="purple"
        />
      </div>
    </div>)
}
