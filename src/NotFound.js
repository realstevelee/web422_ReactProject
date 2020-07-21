import React from 'react'
import { withRouter } from "react-router";

class NotFound extends React.Component
{
   render()
   {
    return(
    <div><h1>Not Found</h1><p>We can't find what you're looking for... hope you find correct page xD</p></div>
       );
   }
}

export default withRouter(NotFound);