module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    rescue_from StandardError, with: :report_error

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_user = env['warden'].user
      verified_user || reject_unauthorized_connection
    end

    def report_error error
      SomeExternalBugtrackingService.notify(error)
    end
  end
end
