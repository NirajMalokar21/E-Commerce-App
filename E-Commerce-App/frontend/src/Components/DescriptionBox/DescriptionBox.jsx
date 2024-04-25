import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descriptionbox-nav-box'>
                Description
            </div>
            <div className='descriptionbox-nav-box fade'>
                Reviews (122)
            </div>
        </div>
        <div className='descriptionbox-description'>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce a odio nec justo gravida sodales. Quisque vel est sit amet diam gravida placerat. Nulla facilisi. Cras commodo lacus non tellus vehicula, vel tempor dui facilisis. Vivamus malesuada magna vitae urna tempor, nec volutpat ipsum interdum. Integer at mauris sed neque vehicula facilisis. Sed vitae justo at ex consectetur faucibus
            </p>
            <p>
                Nunc tincidunt, urna eget tincidunt feugiat, mauris nisi feugiat libero, nec varius quam lorem at purus. Phasellus non ultricies odio. Sed auctor sapien ut sapien ultricies, vel rutrum nisl accumsan.     
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox