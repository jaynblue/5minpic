import React from 'react';
import MoreItem from '~/components/more-item';
import '~/components/more-list/styles.css';

export default class MoreList extends React.Component {

    render() {
        return (
            <div className="more__list">
                <div className="more-list">
                    {this.props.data.map((image, index) => {
                        return <MoreItem image={image}  key={index} />;
                    })}
                </div>
            </div>
        );
    }

}
