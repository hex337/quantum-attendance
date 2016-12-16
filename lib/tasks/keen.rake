namespace :keen do
  desc "Adds all meetings to Keen"
  task backfill: :environment do
    MeetingMember.find_in_batches(batch_size: 100) do |mms|
      events = mms.collect{|mm| mm.to_keen_props unless mm.member.nil?}
      Keen.publish_batch(:attendance => events)
      puts("Did batch of 100.")
    end
  end

end
