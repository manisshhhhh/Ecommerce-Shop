import { Helmet } from "react-helmet-async"

const Meta = ({title,description,keywords}) => {
  return (
      <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
      </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to MyEcommerce",
    description: "we sell the best products for cheap",
    keywords:"electronics , buy elctronics,cheap electronics"
}

export default Meta
