import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollVelocity = ({ trackedRef }) => {
  useEffect(() => {
    const element = trackedRef.current;

    // Create a ScrollTrigger instance and attach it to the element
    const scrollTrigger = ScrollTrigger.create({
      // trigger: element,
      // start: 'top top',
      // end: 'bottom bottom',
      onUpdate: self => {
        // Update the element's background color based on the scroll velocity
        // const velocity = self.getVelocity();
        // const hue = Math.abs(velocity) * 120; // Map the velocity to a hue value between 0 and 120
        // element.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        console.log(self.getVelocity())
      },
      markers:true,
    });

    // Update ScrollTrigger whenever the window is resized
    const handleResize = () => {
      scrollTrigger.update();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTrigger.kill();
    };
  }, [trackedRef]);

  return null; // Since we don't render any visible component
};

export default ScrollVelocity;