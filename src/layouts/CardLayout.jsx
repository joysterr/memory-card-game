import PropTypes from 'prop-types'

CardLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default function CardLayout({ children }) {
    return (
        <div className="w-full mx-auto grid grid-cols-4 grid-rows-4 gap-2 md:w-[50rem]">
            {children}
        </div>
    );
}
