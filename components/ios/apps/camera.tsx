'use client'

import { publicAssetPath } from '@/lib/ios-data'
import { usePhone } from '@/lib/ios-context'
import { AppScreen } from '../primitives'

export function CameraApp() {
  const { openApp } = usePhone()

  return (
    <AppScreen bg="#000">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative max-h-full max-w-full translate-y-[4px] overflow-hidden"
          style={{
            aspectRatio: '1767 / 3051',
            width: 'min(100%, 57.9154dvh)',
            height: 'min(100%, 172.665vw)',
          }}
        >
          <div className="absolute inset-x-0 top-[9.7%] h-[59.13%] overflow-hidden">
            <img
              src={publicAssetPath('/images/bc0146edec1629bb26651cba9411752f.jpg')}
              alt="Portrait in the camera viewfinder"
              className="size-full object-cover"
            />
          </div>
          <img
            src={publicAssetPath('/images/camera.png')}
            alt=""
            className="pointer-events-none absolute inset-0 size-full"
          />
          <button
            type="button"
            onClick={() => openApp('photos')}
            aria-label="Open Photos"
            className="absolute top-[84.5%] left-[7.5%] z-10 aspect-square w-[14%] translate-y-[20px] overflow-hidden rounded-full"
          >
            <img
              src={publicAssetPath('/images/bc0146edec1629bb26651cba9411752f.jpg')}
              alt=""
              className="size-full object-cover"
            />
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
