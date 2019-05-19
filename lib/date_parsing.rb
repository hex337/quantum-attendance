class DateParsing
  def self.parseInputString(input)
    date_formats = [
      '%m/%d/%Y %I:%M %p %Z',
      '%Y-%m-%dT%H:%M %Z',
      '%Y-%m-%d'
    ].freeze

    date_str = input + " " + Time.zone.now.strftime('%Z')
    parsed_date = nil

    date_formats.each do |format|
      parsed_date ||= DateTime.strptime(date_str, format) rescue nil
    end

    if parsed_date.nil?
      logger.error("No date found for input date: #{date_str}")
      return nil
    end

    parsed_date
  end
end
