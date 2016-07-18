import jsonfile from 'jsonfile';
import Controller from 'modules/controller';
import Model from './model';

module.exports = class ContactController extends Controller {
  constructor(...args) {
    super(...args);

    this.routes.push({
      method: 'get',
      path: '/contacts/peter',
      action: this.fetchPeter,
      middleware: [],
    });
  }

  /* Routes */

  fetchPeter(req, res, next) {
    if (req.mock) {
      try {
        const peter = jsonfile.readFileSync(`${__dirname}/../../../json/peter.json`);
        res.data = peter;
        next();
      } catch (err) {
        next(err);
      }

      return;
    }

    Model.findOne({
      email: 'ptshih@gmail.com',
    })
      .exec()
      .tap((contact) => {
        if (!contact) {
          throw new Error('Contact does not exist.');
        }

        res.data = contact.toJSON();
        next();
      })
      .catch(next);
  }
};
