import React from 'react';

function NewlineText({ text = '' }) {
    return text.split('\n').map((str, index) => (
        <React.Fragment key={index}>
            {str}
            <br />
        </React.Fragment>
    ));
}


export default NewlineText;