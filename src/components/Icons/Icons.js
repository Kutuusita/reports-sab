import IconsSVG from './Icons.svg';

const Icons = ({name, color, size, className}) => {

  return(
    <svg className={`icon icon-${name} ${className}`}
        fill={color}
        width={size} height={size}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}

export default Icons;