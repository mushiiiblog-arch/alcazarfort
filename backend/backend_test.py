import requests
import sys
from datetime import datetime

class AlcazarFortAPITester:
    def __init__(self, base_url="https://images-60.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, check_response=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            # Additional response checks if provided
            if success and check_response:
                try:
                    response_data = response.json()
                    success = check_response(response_data)
                    if not success:
                        print(f"❌ Failed - Response validation failed")
                        self.failed_tests.append({"test": name, "reason": "Response validation failed"})
                except Exception as e:
                    success = False
                    print(f"❌ Failed - Response check error: {str(e)}")
                    self.failed_tests.append({"test": name, "reason": f"Response check error: {str(e)}"})
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if check_response:
                    print(f"   Response validation: OK")
            else:
                if response.status_code != expected_status:
                    print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                    self.failed_tests.append({"test": name, "reason": f"Expected {expected_status}, got {response.status_code}"})

            return success, response.json() if response.status_code < 500 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({"test": name, "reason": str(e)})
            return False, {}

    def test_root(self):
        """Test root endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200,
            check_response=lambda r: "message" in r and "version" in r
        )

    def test_list_rooms(self):
        """Test list rooms endpoint"""
        success, response = self.run_test(
            "List Rooms",
            "GET",
            "rooms",
            200,
            check_response=lambda r: "rooms" in r and len(r["rooms"]) == 3
        )
        if success:
            print(f"   Found {len(response.get('rooms', []))} rooms")
        return success, response

    def test_get_room(self, slug, expected_name):
        """Test get specific room"""
        return self.run_test(
            f"Get Room: {slug}",
            "GET",
            f"rooms/{slug}",
            200,
            check_response=lambda r: r.get("slug") == slug and r.get("name") == expected_name
        )

    def test_get_invalid_room(self):
        """Test get invalid room returns 404"""
        return self.run_test(
            "Get Invalid Room (404)",
            "GET",
            "rooms/invalid-slug",
            404
        )

    def test_check_availability(self):
        """Test availability check"""
        return self.run_test(
            "Check Availability",
            "POST",
            "availability",
            200,
            data={
                "check_in": "2025-09-01",
                "check_out": "2025-09-05",
                "adults": 2,
                "children": 1,
                "rooms": 1
            },
            check_response=lambda r: r.get("available") == True and "results" in r
        )

    def test_create_booking(self):
        """Test create booking"""
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "bookings",
            200,
            data={
                "name": "Test User",
                "email": "test@example.com",
                "phone": "03001234567",
                "check_in": "2025-09-01",
                "check_out": "2025-09-05",
                "adults": 2,
                "children": 1,
                "rooms": 1,
                "room_type": "deluxe-rooms",
                "message": "Test booking inquiry"
            },
            check_response=lambda r: "id" in r and r.get("name") == "Test User"
        )
        return success, response

    def test_list_bookings(self):
        """Test list bookings"""
        return self.run_test(
            "List Bookings",
            "GET",
            "bookings",
            200,
            check_response=lambda r: "bookings" in r
        )

    def test_create_contact(self):
        """Test create contact message"""
        return self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,
            data={
                "name": "Test Contact",
                "email": "contact@example.com",
                "phone": "03001234567",
                "subject": "Test Subject",
                "message": "This is a test contact message"
            },
            check_response=lambda r: "id" in r and r.get("name") == "Test Contact"
        )

    def test_list_testimonials(self):
        """Test list testimonials"""
        success, response = self.run_test(
            "List Testimonials",
            "GET",
            "testimonials",
            200,
            check_response=lambda r: "testimonials" in r and len(r["testimonials"]) > 0
        )
        if success:
            print(f"   Found {len(response.get('testimonials', []))} testimonials")
        return success, response

def main():
    print("=" * 60)
    print("Al-Cazar Fort API Testing")
    print("=" * 60)
    
    tester = AlcazarFortAPITester()

    # Test root endpoint
    tester.test_root()

    # Test rooms endpoints
    tester.test_list_rooms()
    tester.test_get_room("premium-lake-view-room", "Premium Lake View Room Set")
    tester.test_get_room("deluxe-rooms", "Deluxe Rooms")
    tester.test_get_room("executive-room", "Executive Room")
    tester.test_get_invalid_room()

    # Test availability
    tester.test_check_availability()

    # Test bookings
    tester.test_create_booking()
    tester.test_list_bookings()

    # Test contact
    tester.test_create_contact()

    # Test testimonials
    tester.test_list_testimonials()

    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Summary")
    print("=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            print(f"  - {failed['test']}: {failed['reason']}")
    
    print("=" * 60)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
