#!/usr/bin/env ruby
require 'sinatra'
require 'json'

post '/event' do
  #nobody contents
  status 204
  #rewind the file pointer of the body
  request.body.rewind
  request_payload = JSON.parse(request.body.read)
  puts request_payload
  #bb8 script of System Call
  system('node bb8-spin.js') if request_payload['event'] == "alert"
  #logging
  File.open("events.log", "a") do |f|
    f.puts(request_payload)
  end
end
