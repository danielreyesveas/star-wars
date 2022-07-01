import Rebels from "../Icons/Rebels";

type SpinnerProps = {
	width?: number;
	height?: number;
	fill?: string;
	className?: string;
};
const Spinner = ({
	width = 100,
	height = 100,
	fill = "#41321f",
	className,
	...props
}: SpinnerProps) => {
	return (
		<Rebels
			width={width}
			height={height}
			fill={fill}
			className={className}
			{...props}
		/>
	);
};

export default Spinner;
