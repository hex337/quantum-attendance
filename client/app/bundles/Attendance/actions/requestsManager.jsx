import request from 'axios';
import ReactOnRails from 'react-on-rails';

export default {
  /**
   * Pull a list of entities from the given endpoint.
   *
   * @param {String} url - The url to call
   * @returns {Promise} - The result of the ajax call
   */
  fetchEntities(url) {
    return request({
      method: 'GET',
      url: url,
      responseType: 'json',
    });
  },

  /**
   * POST the entity to the endpoint.
   *
   * @param {String} url - The url to call
   * @param {Object} entity - Request body to post
   * @returns {Promise} - The result of the ajax call
   */
  submitEntities(url, entity) {
    return request({
      method: 'POST',
      url: url,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity
    });
  },
};
