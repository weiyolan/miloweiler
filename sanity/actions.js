import {HeartIcon} from '@sanity/icons'

export function Love(props) { 
  return {
    label: 'Ask love',
    icon: HeartIcon,
    onHandle: () => {
      // Here you can perform your actions
      window.alert("Jij bent zo'n mooie persoon ❤️")
    }    
  } 
}