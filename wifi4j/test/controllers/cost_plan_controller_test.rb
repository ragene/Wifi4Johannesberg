require 'test_helper'

class CostPlanControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get cost_plan_index_url
    assert_response :success
  end

end
