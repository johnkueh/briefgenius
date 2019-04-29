import _ from 'lodash';
import Link from 'next/link';
import Layout from '../../layouts/main';

const NewForm = () => {
  return (
    <Layout>
      <div className="col-md-8">
        <div className="mb-3">
          <Link href="/forms">
            <a>Back to all forms</a>
          </Link>
        </div>
        <h2 className="mb-5">Add a new form</h2>
        <p className="text-muted">What should we call this form?</p>
        <input type="text" className="form-control mb-3" />
        <p className="text-muted">Select logos</p>
        <div className="logos">
          {mockLogos.map(logo => (
            <div>
              <label>
                <input type="checkbox" />
                <img key={logo.url} src={logo.url} />
              </label>
            </div>
          ))}
        </div>
        <Link href="/forms/new">
          <a className="mt-5 btn btn-primary">Create form</a>
        </Link>
      </div>
      <style jsx>{`
        img {
          width: 150px;
          margin: 10px;
        }
        .logos {
          display: inline-flex;
          flex-wrap: wrap;
        }
      `}</style>
    </Layout>
  );
};

const mockLogos = _.times(10, i => ({
  url: `https://via.placeholder.com/400x200?text=Logo+${i + 1}`
}));
export default NewForm;
